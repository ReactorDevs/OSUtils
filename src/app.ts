import colors from "colors"
import { version, stable } from "./version.json"
colors.enable()

console.log(`Running OSUtils v${version}`.blue, "\n")
if(!stable){
    console.warn("This is an un-stable version, expect bugs to happen. Please report any bugs you find!".yellow)
    console.log("Starting on 5 seconds...")
}
setTimeout(() => {
    console.clear()
    console.log("Welcome to OSUtils!".green)
}, 5000)