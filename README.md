# VSCode Extension Plugin

This is just a VSCode Extension template. It does nothing of value, but is helpful if you're starting from absolutely nothing.

# Development

You can run this plugin local for development run the following command from the terminal within the project's root directory.

```bash
npm run watch
```

1. Open the `extension.ts` file.
2. Click the `Run` menu while the `extension.ts` is in the active editor window
3. Select `Start Debugging` a new VSCode debug window will be launched running the in development version of the plugin.

# Distribution

To create a distribution run the following commands:

```bash
npm run package
```

This will create a file `example-extension-<version>.vsix`. Obviously you'll want to change this to suit your own needs. :-)

# Installation

Within VSCode you can install an extension manually by doing the following

1. Right click the `example-extension-<version>.vsix` file
2. Select `Install Extension VSIX`
3. You shoul see a `Example Extension` in the lower right hand status bar.

# Uninstall

This can be removed like any other extension from the extension menu.