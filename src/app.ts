/*
*   ___  ____  _   _ _   _ _     
*  / _ \/ ___|| | | | |_(_) |___ 
* | | | \___ \| | | | __| | / __|
* | |_| |___) | |_| | |_| | \__ \
*  \___/|____/ \___/ \__|_|_|___/
*
*
* Copyright (C) 2021-2022  ilai
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Lesser General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Lesser General Public License for more details.
*/

import colors from "colors"
import translate from "./lang/translator"
import { version, stable } from "./version.json"
import { existsSync } from "fs"
import wizard from "./wizard/wizard"
import path from "node:path"
colors.enable()

// Here is where all config files will be stored
let APPDATA: string

switch(process.platform){
case "win32": APPDATA = process.env.APPDATA as string; break
case "linux": APPDATA = process.env.HOME as string + "/.config"; break
}

const start = async () => {
    // Path to the config file
    const pth = path.join(APPDATA, "OSUtils/config.json")
    if(!existsSync(path.join(APPDATA, "OSUtils/"))) await wizard(APPDATA)
    console.log(
        translate("Running OSUtils v%s", 
            await import(pth)
        ).blue, version
    )
    console.log("\n")

    if(!stable){
        console.warn("This is an un-stable version, expect bugs to happen. Please report any bugs you find!".yellow)
        console.log("Starting on 5 seconds...")
    }
    setTimeout(() => {
        console.clear()
        console.log("Welcome to OSUtils!".green)
    }, 5000)
}

start()