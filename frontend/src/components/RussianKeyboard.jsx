import React, { Component } from 'react';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

class RussianKeyboard extends Component {
  constructor(props) {
    super(props);

    this.keyboard = new Keyboard({
      onChange: this.onChange,
      layoutName: 'default', // Указываем русскую раскладку
      display: {
        '{bksp}': '⌫', // Заменяем текст на кнопке для удаления
      },
    });
  }

  onChange = (input) => {
    this.props.onInput(input);
  };

  render() {
    return (
      <div>
        <input
          className="input"
          readOnly
          value={this.props.input}
          onClick={() => {
            this.keyboard.setInput(this.props.input);
          }}
        />
        <div className="simple-keyboard" />
      </div>
    );
  }
}

export default RussianKeyboard;
