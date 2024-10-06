import * as vscode from "vscode";
import * as child_process from "child_process";
import path from "path";

let extensionStatusBar: vscode.StatusBarItem;
const extensionDefaultText = "Example Extension";
const defaultCommand = "example-extension.showCommands"; // When you click on the command what should it do?
const reuseTerminal = vscode.window.createTerminal("Example Extension");
const extensionColor = "blue";

export function activate(context: vscode.ExtensionContext) {
  console.log(`Activated ${extensionDefaultText}`);

  context.subscriptions.push(
    vscode.commands.registerCommand("example-extension.showCommands", () => {
      const quickPick = vscode.window.createQuickPick();
      quickPick.items = [
        {
          label: `${extensionDefaultText}: Ping`,
          description: "example-extension.ping",
          detail: "This pings example.com",
        },
      ];
      quickPick.onDidChangeSelection(([item]) => {
        if (item && item.description) {
          vscode.commands.executeCommand(item.description);
        }
      });
      quickPick.show();
    }),
  );

  extensionStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );

  // Setup the extension on the toolbar

  extensionStatusBar.command = defaultCommand;
  extensionStatusBar.name =extensionDefaultText;
  extensionStatusBar.text = extensionDefaultText;
  extensionStatusBar.color = extensionColor;
  context.subscriptions.push(extensionStatusBar);

  extensionStatusBar.show();

  // Register the commands you want for your extension

  context.subscriptions.push(
    vscode.commands.registerCommand("example-extension.ping", () => {
      
      reuseTerminal.sendText(
        `ping example.com`,
      );
      reuseTerminal.show();
    }),
  );

}

export function deactivate() {}

// Run a command in the terminal
function runInTerminal(
  command: string,
  options?: { callBack?: (stdout: string) => void },
): void {
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      vscode.window.showInformationMessage(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      vscode.window.showInformationMessage(`Error: ${stderr}`);
    }

    if (options && options.callBack) {
      options.callBack(stdout);
    } else {
      extensionStatusBar.text = `${extensionDefaultText}: ${stdout}`;
      setTimeout(() => {
        extensionStatusBar.text = extensionDefaultText;
      }, 4000);
    }
  });
}

// Show a message in the status bar for a few seconds
function showStatusText(text: string) {
  extensionStatusBar.text = text;
  extensionStatusBar.text = `${extensionDefaultText}: ${text}`;

  setTimeout(() => {
    extensionStatusBar.text = extensionDefaultText;
  }, 4000);
}
