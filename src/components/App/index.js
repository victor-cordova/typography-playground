import React, { Component } from "react";
import "./styles.scss";
import CustomText from "../CustomText";
import TextSettings from "../TextSettings";
import { SETTINGS_DEFAULT } from "../../config/settings.js";
import PrebuiltSettings from "../PrebuiltSettings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...SETTINGS_DEFAULT,
      showingSettings: false,
      titleText: "About usefulness",
      bodyText:
        "Absorb what is useful, discard what is useless and add what is specifically your own."
    };

    this.getUpdateHandlers = this.getUpdateHandlers.bind(this);
    this.getSettingsContentClassNames = this.getSettingsContentClassNames.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.toggleShowingSettings = this.toggleShowingSettings.bind(this);
    this.getContentWrapperClassNames = this.getContentWrapperClassNames.bind(this);
  }

  getUpdateHandlers(settingsKey, textKey) {
    const updateSettingsValUnit = propName => {
      return (value, unit) => {
        const valForKey = {
          ...this.state[settingsKey],
          [propName]: {
            value,
            unit
          }
        };
        this.setState({
          [settingsKey]: valForKey
        });
      };
    };

    const updateSettingsVal = propName => {
      return value => {
        const valForKey = {
          ...this.state[settingsKey],
          [propName]: value
        };
        this.setState({
          [settingsKey]: valForKey
        });
      };
    };

    const updateTextVal = () => {
      return value => {
        this.setState({
          [textKey]: value
        });
      };
    };

    return {
      onTextUpdate: updateTextVal(),
      onFontFamilyUpdate: updateSettingsVal("fontFamily"),
      onFontSizeUpdate: updateSettingsValUnit("fontSize"),
      onLineHeightUpdate: updateSettingsValUnit("lineHeight"),
      onLetterSpacingUpdate: updateSettingsValUnit("letterSpacing")
    };
  }

  getSettingsContentClassNames() {
    let classes = ["App__settingsContent"];
    if (this.state.showingSettings) {
      classes.push("opened");
    }
    return classes.join(" ");
  }

  getContentWrapperClassNames() {
    let classes = ["App__contentWrapper"];
    if (this.state.showingSettings) {
      classes.push("App__overflowHidden");
    }
    return classes.join(" ");
  }

  updateSettings(newSettings) {
    this.setState({
      ...Object.assign({}, this.state, newSettings)
    });
  }

  toggleShowingSettings(showing) {
    this.setState({ showingSettings: showing });
  }

  render() {
    return (
      <div className="App">
        <main>
          <section className={this.getContentWrapperClassNames()}>
            <header>
              <h1 className="App__headerTitle">Type Playground</h1>
            </header>
            <CustomText text={this.state.titleText} settings={this.state.titleSettings} />
            <hr />
            <CustomText text={this.state.bodyText} settings={this.state.bodySettings} />
          </section>
          <article>
            <div className="App__settings">
              {this.state.showingSettings && (
                <div
                  className="App__settingsOverlay"
                  onClick={() => this.toggleShowingSettings(false)}
                />
              )}
              <div className={this.getSettingsContentClassNames()}>
                {!this.state.showingSettings && (
                  <button
                    className="App__btnOpenSettings"
                    onClick={() => this.toggleShowingSettings(true)}
                  >
                    SETTINGS
                  </button>
                )}
                {this.state.showingSettings && (
                  <div>
                    <button
                      className="App__btnCloseSettings"
                      onClick={() => this.toggleShowingSettings(false)}
                    >
                      <i className="far fa-times-circle" />
                    </button>
                    <div className="App__settingsColumn">
                      <TextSettings
                        title="Title settings"
                        text={this.state.titleText}
                        settings={this.state.titleSettings}
                        {...this.getUpdateHandlers("titleSettings", "titleText")}
                      />
                    </div>
                    <div className="App__settingsColumn">
                      <TextSettings
                        title="Body settings"
                        text={this.state.bodyText}
                        settings={this.state.bodySettings}
                        {...this.getUpdateHandlers("bodySettings", "bodyText")}
                      />
                    </div>
                    <hr />
                    <PrebuiltSettings updateFn={this.updateSettings} />
                  </div>
                )}
              </div>
            </div>
          </article>
        </main>
        <section />
      </div>
    );
  }
}

export default App;
