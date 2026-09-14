"use strict";
const fs=require("fs"),path=require("path"),support=require("./module-support");
function create(options){
  options=options||{};const s=options.support||support.create("application-continuity"),marker=options.marker||"/var/luna/preferences/devmode_enabled",apps=options.apps||"/media/developer/apps/usr/palm/applications";
  function markerState(){try{const stat=fs.lstatSync(marker);return stat.isDirectory()&&!stat.isSymbolicLink()?"directory":stat.isSymbolicLink()?"symbolic-link":"other";}catch(e){if(e.code==="ENOENT")return "missing";throw e;}}
  function maintain(){const settings=s.state();if(!settings||!settings.desired)return;const state=markerState();if(state==="missing")fs.mkdirSync(marker,{mode:0o755});else if(state!=="directory")throw Error("Developer marker is not a directory. Existing data was left untouched; manual migration is required.");}
  function report(){const settings=s.state()||{desired:false},state=markerState(),installed=[];try{for(const id of fs.readdirSync(apps)){try{const info=JSON.parse(fs.readFileSync(path.join(apps,id,"appinfo.json"),"utf8"));installed.push({id:info.id,title:info.title,version:info.version});}catch(_){}}}catch(e){if(e.code!=="ENOENT")throw e;}return {healthy:!settings.desired||state==="directory",marker:state,maintenanceEnabled:settings.desired,installedApps:installed,scope:"Maintains the existing local application-retention marker; does not contact LG or create an LG session.",limits:"Not a package/configuration backup and not a guarantee against firmware updates or vendor cleanup. Independent recovery and backups remain necessary."};}
  async function run(action,args){
    args=args||{};
    if(action==="enable"){s.claim();if(!s.state())s.save({desired:markerState()==="directory"});maintain();}
    else if(action==="disable"){s.claim();return Object.assign(report(),{maintenanceStopped:true,retained:"Retention marker deliberately kept: removing it could cause installed apps and data to be deleted."});}
    else if(action==="reconcile"||action==="maintenance"){s.claim();maintain();}
    else if(action==="setMaintenance"){if(typeof args.enabled!=="boolean")throw Error("Expected enabled boolean");if(args.enabled&&!["missing","directory"].includes(markerState()))throw Error("Existing Developer Mode marker was not changed");s.save({desired:args.enabled});maintain();}
    else if(!["status","health"].includes(action))throw Error("Unknown continuity action");
    return report();
  }
  return {run};
}
if(require.main===module)support.main(create);module.exports={create};
