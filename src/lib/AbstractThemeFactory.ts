export interface AbstractThemeFactory {
  name: string;
  text(): string;
  bg(): string;
  tile(): string;
  grid(): string;
  warning(): string;
  x(): string;
  o(): string;
  modal(): string;
  input(): string;
  inputText(): string;
  button(): string;
  buttonText(): string;
}

export class BaseTheme implements AbstractThemeFactory {
  name = "base";
  text() {
    return "black";
  }
  bg() {
    return "white";
  }
  tile() {
    return "white";
  }
  grid() {
    return "black";
  }
  warning() {
    return "red";
  }
  x() {
    return "black";
  }
  o() {
    return "black";
  }
  modal() {
    return "white";
  }
  input() {
    return "white";
  }
  inputText() {
    return "black";
  }
  button() {
    return "blue";
  }
  buttonText() {
    return "white";
  }
}

export class DarkTheme implements AbstractThemeFactory {
  name = "dark";
  text() {
    return "white";
  }
  bg() {
    return "#444";
  }
  tile() {
    return "#eee";
  }
  grid() {
    return "black";
  }
  warning() {
    return "#ee1100";
  }
  x() {
    return "black";
  }
  o() {
    return "black";
  }
  modal() {
    return "blue";
  }
  input() {
    return "white";
  }
  inputText() {
    return "black";
  }
  button() {
    return "black";
  }
  buttonText() {
    return "white";
  }
}

export class GreenTheme implements AbstractThemeFactory {
  name = "green";
  text() {
    return "white";
  }
  bg() {
    return "#00aa11";
  }
  tile() {
    return "#green";
  }
  grid() {
    return "black";
  }
  warning() {
    return "#ee11ea";
  }
  x() {
    return "#eaf";
  }
  o() {
    return "#eaf";
  }
  modal() {
    return "green";
  }
  input() {
    return "teal";
  }
  inputText() {
    return "white";
  }
  button() {
    return "green";
  }
  buttonText() {
    return "white";
  }
}

export class BlueTheme implements AbstractThemeFactory {
  name = "blue";
  text() {
    return "black";
  }
  bg() {
    return "lightsteelblue";
  }
  tile() {
    return "#eee";
  }
  grid() {
    return "black";
  }
  warning() {
    return "#0022ee";
  }
  x() {
    return "blue";
  }
  o() {
    return "blue";
  }
  modal() {
    return "blue";
  }
  input() {
    return "white";
  }
  inputText() {
    return "black";
  }
  button() {
    return "#0022aa";
  }
  buttonText() {
    return "white";
  }
}

export function makeTheme(theme: BaseTheme) {
  const styles = {
    text: theme.text(),
    bg: theme.bg(),
    tile: theme.tile(),
    grid: theme.grid(),
    warning: theme.warning(),
    x: theme.x(),
    o: theme.o(),
    modal: theme.modal(),
    input: theme.input(),
    "input-text": theme.inputText(),
    button: theme.button(),
    "button-text": theme.buttonText(),
  };
  Object.entries(styles).forEach(([k, v]) => {
    document.documentElement.style.setProperty(`--color-${k}`, v);
  });
}
