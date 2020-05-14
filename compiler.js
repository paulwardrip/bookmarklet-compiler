#!/usr/bin/env node

(() => {
    "use strict";

    const fs = require("fs");
    const browserify = require("browserify");
    const clipboard = require("copy-paste").copy;
    const bytelen = require("@hyperfocus/bytelength");
    const oneline = require("@hyperfocus/oneliner");

    const io = {
        in: process.argv[2],
        out: process.argv[3]
    };

    const bounce = function (e,code) {
        if (e) console.log(e);
        process.exit(code || 1);
    };

    if (!io.in) {
        bounce("usage: bookmarklet <input-file> [ouput-file]", 500);
    } else if (!fs.existsSync(io.in)) {
        bounce("cannot locate input file: " + io.in, 404);
    }

    console.log ("Given File Paths:", JSON.stringify(io, null, 2));

    browserify(io.in)
        .transform("babelify", {presets: ["babel-preset-env"]})
        .transform("uglifyify", { global: true })
        .bundle((e, buf) => {
            if (e) bounce(e, 5461);

            let transpiled = "javascript:" + oneline((buf.toString('UTF-8')).replace(/^"use strict";/, ""));
            console.log("Compiled Bookmarklet!");
            console.log(`-> size: ${bytelen.ofString(transpiled).value}`);

            if (io.out) {
                fs.writeFileSync(io.out, transpiled);
                console.log("-> bookmarklet written to:", io.out);
            }

            clipboard(transpiled, (e)=>{
                if (!e) console.log("-> bookmarklet URL copied to clipboard, paste into a bookmark in your browser.");
            });
        });
})();