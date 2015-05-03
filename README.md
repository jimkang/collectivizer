collectivizer
=============

Finds collective nouns for a given noun.

Installation
------------

    npm install collectivizer

Usage
-----

    var collectivizer = createCollectivizer({
      wordnikAPIKey: 'your key here'
    });

    collectivizer.collectivize('fool', showResult);

    function showResult(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(JSON.stringify(result, null, '  '));
      }
    }

Output (higher scores indicate it think those are better collective nouns):

    {
      "0": "man",
      "1": "sign",
      "2": "database",
      "3": "visitor",
      "4": "favourite",
      "5": "youtube",
      "6": "bishop",
      "7": "mug",
      "8": "destiny",
      "9": "vessel",
      "10": "sitcom",
      "11": "liner",
      "12": "fate",
      "14": "representative",
      "15": "porter",
      "16": "bobbing",
      "19": "allegory",
      "20": "lodger",
      "22": "hieronymus",
      "23": "purgatory",
      "24": "faction",
      "28": "whole",
      "30": "sip",
      "32": "wake",
      "44": "feast",
      "58": "rush",
      "72": "gauntlet",
      "288": "ship"
    }

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
