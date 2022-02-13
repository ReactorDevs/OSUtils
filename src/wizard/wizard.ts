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
import { prompt } from "enquirer"
import { existsSync, mkdir, mkdirSync, promises } from "fs"
import path from "path"

export default async function wizard(APPDATA: string){
    console.log("\n")
    console.log("Hi! This is a tiny wizard to help you to get started with OSUtils.".yellow)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const answer: any = await prompt({
        type: "input",
        name: "locale",
        message: "What is your preferred language?",
        initial: "en",
        validate(value: string): string | boolean{
            if(!["en"].includes(value.toLowerCase())) return "Please enter a valid language code. Available languages: \"en\"."
            return true
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })
    if(!existsSync(path.join(APPDATA, "OSUtils/"))){
        mkdirSync(path.join(APPDATA, "OSUtils/"))
        const c = JSON.stringify({ locale: answer.locale })
        console.log(path.join(APPDATA, "OSUtils/config.json"))
        await promises.appendFile(path.join(APPDATA, "OSUtils/config.json"), c)
    }
}