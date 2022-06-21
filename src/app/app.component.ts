// Component Class

import { Component } from '@angular/core';
export { AppComponent };

@Component(
	{
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.scss']
	})


class AppComponent
{
	// All properties and methods within this class must be public
	// (not static, not protected, not private).
	public title = "pw";
	public password = ""; // generated password
	public passwordLength = 0;

	public options = {
		letters: false,
		numbers: false,
		symbols: false
	};

	public ButtonDisabledCondition(): boolean
	{
		return !(this.passwordLength && (this.options.letters || this.options.numbers || this.options.symbols));
	}

	public OnButtonClick()
	{
		const numbers = "0123456789";
		const letters = "abcdefghijklmnopqrstuvwxyz";
		const symbols = "!@#$%^&*()";

		let validChars = "";
		let generatedPassword = "";

		if (this.options.letters) {
			validChars += letters;
		}

		if (this.options.numbers) {
			validChars += numbers;
		}

		if (this.options.symbols) {
			validChars += symbols;
		}

		for (let i = 0; i < this.passwordLength; i++) {
			const index = Math.floor( Math.random() * validChars.length );
			generatedPassword += validChars[index];
		}

		this.password = generatedPassword;
	}

	public GetPassword(): string
	{
		return this.password;
	}

	// public OnLengthInput(ev: InputEvent): void  // both Event or InputEvent work here
	public OnLengthInput(ev: Event): void
	{
		console.dir(ev); // = InputEvent (no matter if 'ev' is 'Event' or 'InputEvent')
		const inputElem: HTMLInputElement = ev.target as HTMLInputElement;

		const parsedValue: number = parseInt(inputElem.value);

		if (!isNaN(parsedValue)) {
			this.passwordLength = parsedValue;
			console.log(this.passwordLength);
		}
	}

	// It is _not_ possible to define an Event parameter like on the following line:
	// public OnLettersChange(ev: Event): void
	// if no parameter has been passed to the method! (error: "Expected 1 argument")
	public OnLettersChange(): void
	{
		console.log("OnLettersChange()");
		this.options.letters = !this.options.letters;
	}

	public OnNumbersChange(target: EventTarget): void
	{
		console.dir(target); // not used, this is just for demo purposes
		this.options.numbers = !this.options.numbers;
	}

	public OnSymbolsChange(ev: Event): void
	{
		console.dir(ev); // not used, this is just for demo purposes
		this.options.symbols = !this.options.symbols;
	}
}
