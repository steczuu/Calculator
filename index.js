/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);


const ADDITION_ID = 'js-addition';
const BACK_ID = 'js-back';
const CANCEL_ID = 'js-cancel';
const CLEAR_ID = 'js-clear';
const COMMA_ID = 'js-comma';
const CONTAINER_CLASS_SELECTOR = '.calculator__container';
const DISPLAY_ID = 'js-display';
const DIVIDE_ID = 'js-divide';
const EQUAL_ID = 'js-equal';
const FRACTION_ID = 'js-fraction';
const INVERT_ID = 'js-invert';
const MEMORY_ADD_ID = 'js-M+';
const MEMORY_CLEAR_ID = 'js-MC';
const MEMORY_MINUS_ID = 'js-M-';
const MEMORY_READ_ID = 'js-MR';
const MEMORY_SET_ID = 'js-MS';
const MULTIPLY_ID = 'js-multiply';
const NUMBER_CLASS_SELECTOR = '.calculator__button--is-number';
const PERCENT_ID = 'js-percent';
const POWER_ID = 'js-power';
const SUBSTRACTION_ID = 'js-subtraction';
const SQUARE_ID = 'js-square';

class Calculator {
	constructor() {
		this.memoryValue = 0;
		this.displayValue = '0';
		this.previousValue = null;
		this.selectedFunction = null;
		this.isFunctionDone = false;
		this.repeatedValue = 0;
		this.wasEqualClicked = false;
		this.wasSpecialFunctionClicked = false;
		this.historyDisplay = null;

		this.attachToDisplay();
		this.attachToNumbers();
		this.attachToButtons();
	}

	attachToDisplay() {
		const display = document.getElementById(DISPLAY_ID);

		if (!display) {
			throw('There is no element for displaying data');
		}
		
		display.textContent = this.displayValue;
		this.display = display;

		const historyDisplay = document.querySelector(CONTAINER_CLASS_SELECTOR);

		if (!historyDisplay) {
			console.warn('There is no history container for displaying history');

			return;
		}

		this.historyDisplay = historyDisplay;
	}

	attachToNumbers() {
		const numbers = document.querySelectorAll(NUMBER_CLASS_SELECTOR);
		
		if (numbers.length !== 10) {
			console.warn("There aren't all needed numbers of calculator's keyboard");
		}

		numbers.forEach(number => number.addEventListener('click', event => this.concatenateNumber(event)));
	}

	attachToButtons() {
		this.attachToFunctionButton(MEMORY_READ_ID, () => this.memoryRead());
		this.attachToFunctionButton(MEMORY_CLEAR_ID, () => this.memoryClear());
		this.attachToFunctionButton(MEMORY_ADD_ID, () => this.memoryAdd());
		this.attachToFunctionButton(MEMORY_MINUS_ID, () => this.memoryMinus());
		this.attachToFunctionButton(MEMORY_SET_ID, () => this.memorySet());
		this.attachToFunctionButton(CLEAR_ID, () => this.clear());
		this.attachToFunctionButton(CANCEL_ID, () => this.cancel());
		this.attachToFunctionButton(COMMA_ID, () => this.addComma());
		this.attachToFunctionButton(BACK_ID, () => this.back());
		this.attachToFunctionButton(EQUAL_ID, () => this.equal());
		this.attachToFunctionButton(ADDITION_ID, () => this.addition());
		this.attachToFunctionButton(SUBSTRACTION_ID, () => this.substraction());
		this.attachToFunctionButton(INVERT_ID, () => this.invertNumber());
		this.attachToFunctionButton(MULTIPLY_ID, () => this.multiplication());
		this.attachToFunctionButton(DIVIDE_ID, () => this.divide());
		this.attachToFunctionButton(SQUARE_ID, () => this.square());
		this.attachToFunctionButton(POWER_ID, () => this.power());
		this.attachToFunctionButton(FRACTION_ID, () => this.oneXth());
		this.attachToFunctionButton(PERCENT_ID, () => this.percent());
	}
	
	attachToFunctionButton(elementId, callback) {
		const element = document.getElementById(elementId);
		
		if (!element) {
			console.warn(`I didn't find element with id: ${elementId} functionality of calculator can be invalid`);

			return;
		}

		element.addEventListener('click', () => callback());
	}

	concatenateNumber(event) {
		this.displayValue = this.displayValue === null || this.displayValue === '0' || this.wasSpecialFunctionClicked
			? event.target.textContent
			: this.displayValue + event.target.textContent;

		if (this.wasEqualClicked) {
			this.previousValue = 0;
			this.repeatedValue = 0;
			this.wasEqualClicked = false;
		}

		this.isFunctionDone = false;
		this.wasSpecialFunctionClicked = false;

		this.display.textContent = this.displayValue;
	}

	memoryAdd() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = this.memoryValue + Number(this.displayValue);
	}

	memoryClear() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = 0;
	}

	memoryMinus() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = this.memoryValue - Number(this.displayValue);
	}

	memoryRead() {
		this.wasSpecialFunctionClicked = true;
		this.changeDisplayValue(this.memoryValue.toString());
	}

	memorySet() {
		this.wasSpecialFunctionClicked = true;
		this.memoryValue = Number(this.displayValue);
	}

	clear() {
		this.previousValue = null;
		this.selectedFunction = null;
		this.changeDisplayValue(null);
	}

	cancel() {
		this.changeDisplayValue(null);
	}

	invertNumber() {
		this.changeDisplayValue(this.displayValue >= 0 ? -Math.abs(this.displayValue) : Math.abs(this.displayValue))
	}

	addComma() {
		if (!this.display.textContent.includes('.')) {
			this.changeDisplayValue(`${this.displayValue ? this.displayValue : '0'}.`);
		}
	}

	back() {
		this.changeDisplayValue(this.displayValue ? this.displayValue.slice(0, -1) : null);
	}

	equal() {
		this.isFunctionDone = false;
		if (!this.wasEqualClicked) {
			this.selectedFunction(false);
		} else {
			this.selectedFunction(true);
		}

		this.wasEqualClicked = true;
	}

	addition(hasRepetedValue) {
		this.callPreviousFunctionAndChangeIt(this.addition, hasRepetedValue)
		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			
			return;
		}

		const [ displayValue, previousValue ] = this.getValuesToCalculations(hasRepetedValue);
		const newValue = displayValue + previousValue;

		this.createHistoryElement(displayValue, '+', previousValue, newValue);

		this.repeatedValue = this.getRepeatedValue(hasRepetedValue, newValue);
		this.afterNewValueCalculation(newValue);
	}

	substraction(hasRepetedValue) {
		this.callPreviousFunctionAndChangeIt(this.substraction, hasRepetedValue)
		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			
			return;
		}

		const [ displayValue, previousValue ] = this.getValuesToCalculations(hasRepetedValue);
		let newValue;

		if (this.previousValue !== null) {
			newValue = hasRepetedValue
				? displayValue - this.repeatedValue
				: previousValue - displayValue;

			this.repeatedValue = this.getRepeatedValue(hasRepetedValue, newValue);
		}

		this.afterNewValueCalculation(newValue);
	}

	multiplication(hasRepetedValue) {
		this.callPreviousFunctionAndChangeIt(this.multiplication, hasRepetedValue);
		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			
			return;
		}

		const [ displayValue, previousValue ] = this.getValuesToCalculations(hasRepetedValue);
		const newValue = displayValue * previousValue;

		this.repeatedValue = this.getRepeatedValue(hasRepetedValue, newValue);
		this.afterNewValueCalculation(newValue);
	}

	divide(hasRepetedValue) {
		this.callPreviousFunctionAndChangeIt(this.divide, hasRepetedValue)
		if (this.isFunctionDone) {
			this.handleSecondClickOnFunction();
			
			return;
		}

		const [ displayValue, previousValue ] = this.getValuesToCalculations(hasRepetedValue);
		const newValue = hasRepetedValue
				? displayValue / this.repeatedValue
				: this.previousValue === 0
					? displayValue
					: previousValue / displayValue 

		this.repeatedValue = this.getRepeatedValue(hasRepetedValue, newValue);
		this.afterNewValueCalculation(newValue);
	}

	square() {
		this.callSpecialFunction(Math.sqrt(this.displayValue));
	}

	power() {
		this.callSpecialFunction(this.displayValue ** 2);
	}

	oneXth() {
		this.callSpecialFunction(1/this.displayValue);
	}

	percent() {
		this.callSpecialFunction(this.previousValue * this.displayValue / 100);
	}

	callSpecialFunction(value) {
		this.wasEqualClicked = false;
		this.wasSpecialFunctionClicked = true;
		this.changeDisplayValue(value);
	}

	callPreviousFunctionAndChangeIt(previousFunction, hasRepetedValue) {
		if (this.selectedFunction !== previousFunction && this.selectedFunction) {
			this.selectedFunction(hasRepetedValue);
		}

		this.selectedFunction = previousFunction;
	}

	handleSecondClickOnFunction() {
		this.repeatedValue = this.getRepeatedValue(null, this.previousValue);
		this.displayValue = '0';
		this.wasEqualClicked = false;
	}

	afterNewValueCalculation(newValue) {
		this.isFunctionDone = true;
		this.wasEqualClicked = false;
		this.displayValue = null;
		this.display.textContent = this.previousValue !== null ? newValue : this.display.textContent;
		this.previousValue = this.previousValue !== null ? newValue : this.display.textContent;
	}

	getRepeatedValue(hasRepetedValue, newValue) {
		if (hasRepetedValue === null) {
			return Number(newValue);
		}

		return hasRepetedValue
			? this.repeatedValue
			: this.wasEqualClicked
				? newValue
				: Number(this.display.textContent);
	}

	getValuesToCalculations(hasRepetedValue) {
		const displayValue = Number(this.display.textContent);
		const previousValue = hasRepetedValue ? this.repeatedValue : Number(this.previousValue);

		return [ displayValue, previousValue ];
	}

	changeDisplayValue(value) {
		const isNoValue = value === null || value === '';

		this.displayValue = isNoValue ? null : value.toString();
		this.display.textContent = isNoValue ? '0' : value.toString();
	}

	createHistoryElement(firstValue, char, secoundValue, result) {
		const paragraph = document.createElement('p');
		paragraph.classList.add('calculator__history-element');
		paragraph.textContent = `${firstValue} ${char} ${secoundValue} = ${result}`;

		this.historyDisplay.insertAdjacentElement('afterbegin', paragraph);

	}
}

new Calculator();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"calculator":"calculator","calculator__main-wrapper":"calculator__main-wrapper","calculator__display":"calculator__display","calculator__memory-row":"calculator__memory-row","calculator__memory-button":"calculator__memory-button","calculator__buttons-wrapper":"calculator__buttons-wrapper","calculator__button":"calculator__button","calculator__button--is-light":"calculator__button--is-light","calculator__history-wrapper":"calculator__history-wrapper"};

/***/ })
/******/ ]);