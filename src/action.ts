import {run} from "@apple-jxa/node";
import alfred from "@alfred-workflows/core";

const name = alfred.input;
run((name) => {
    let application = Application("Tunnelblick");
    application.includeStandardAdditions = true;
    const length = application.configurations().length
    for (let i = 0; i < length; i++) {
        const configuration = application.configurations.at(i);
        if (configuration.name() === name) {
            if (configuration.state() === 'EXITING') {
                application.connect(configuration.name())
            } else {
                application.disconnect(configuration.name())
            }
        } else if (configuration.state() !== 'EXITING') {
            application.disconnect(configuration.name())
        }
    }
}, name).then();

// on alfred_script(q)
//
// set msg to ""
// tell application "Tunnelblick"
// set configs to get name of configurations
// if q is in configs then
// set s to get state of first configuration where name = q
// if s is equal to "CONNECTED" then
// if disconnect q then
// else
// return "Could not disconnect from: " & q
// end if
// else
// if connect q then
// else
// return "Could not connect to: " & q
// end if
//     end if
//     else
// return "There is no VPN named: " & q
// end if
//     end tell
//
// end alfred_script