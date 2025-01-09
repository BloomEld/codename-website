# Codename Engine Website

**To contribute to this wiki's pages**, please go to ``wiki/``, and change the .md files (if you add a new one make sure to add it in ``wiki/wiki.json``.)

**To update the API Docs**, please go to ``api-generator/api/``, and paste the results from the ``art/generateDocs.bat`` (From the main repo) script. Then you gotta run ``filter.py``, make sure you have python installed, and have run ``pip install lxml``.

**To make tools work**, please go to ``tools/`` and make your page there, and when you're done, add it to the list in ``tools.build.js`` and ``tools/index.html``, then after you're done, make a PR.

## Compiling the website

To compile the website, you need to have [nodejs](https://nodejs.org/en/) installed.

Then, run the following commands:

```bash
npm install
npm run build
```

This will compile the website and place them in the ``export`` folder.

To preview the website in the browser, run the following command:

Windows:
```batch
./webserver.bat
```

Linux and MacOS:
```bash
./webserver.sh
```

The server will be running on port 4030. So, open http://localhost:4030 in your browser.

## Updating the last updated time

in the section above the markdown there is a line that says

```yaml
lastUpdated: 2025-01-08T23:57:11.145Z
```

https://www.timestamp-converter.com/ Use this to get the time in ISO 8601 format.
