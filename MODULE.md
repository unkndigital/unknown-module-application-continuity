# Application Continuity

Maintains the local app-retention marker without contacting an LG session service; shows the installed developer-app inventory.

## Prerequisites

Install only on a TV you own with existing owner-controlled unjailed root and Unknown Core supporting maintenance/dependency contracts. Keep independent recovery access. Review this ZIP's source and license before activation. No rooting method or LG login is included.

## Install and Use

Build with the workspace Build.cmd or npm run build. Install this ZIP using Core's Install screen, then enable it. Open this module's settings in Core or Home's Module Apps view. Existing legacy settings are adopted when present; a fresh installation does not silently enable protections or listeners. Maintenance runs about once per minute while Core's monitor is healthy.

## Disable, Restore and Limits

Disabling stops Core maintenance but deliberately leaves the retention marker and installed apps intact. This is not an app/package/configuration backup, firmware protection, or a universal persistence guarantee. Existing independent recovery/app-backup tools remain outside this module and are not silently adopted. Keep those tools and your backups. No Kodi-specific behavior is included.

Migration claims remain under /var/lib/unknown-home/core-owners after disabling or removing a module so a compatible legacy guardian cannot silently reactivate it. Configuration and recovery state are retained. A legacy guardian that does not recognize these claims must be migrated or stopped explicitly first.

## Audit and Responsibility

View current status and Check module health show this module's observations. Core Audit independently verifies packaged file hashes and records lifecycle failures. Neither a checksum nor a successful health check guarantees safety or universal model support. Unsupported states must remain visible. This is owner-installed software for privacy, transparency and local device control, not unauthorized access or surveillance. MIT warranty/liability limitations apply to the extent permitted by law.

Attribution: Unknown Digital and Unknown Suite contributors.
