import './style.css';

// Elements

const inputSpecialCharacters = document.querySelector(
	'#special-characters'
) as HTMLInputElement;
const inputRange = document.querySelector('#length') as HTMLInputElement;
const inputCapitalLetter = document.querySelector(
	'#uppercase'
) as HTMLInputElement;
const form = document.querySelector('.form') as HTMLFormElement;
const result = document.querySelector(
	'.result-password'
) as HTMLParagraphElement;

// Imports

import {
	FormData,
	letters as lettersArray,
	specialCharacters as charactersArray,
} from './helpers/helpers';

// Logic

const validate = (array: string[], characters: string[]): boolean | void => {
	for (const element of characters) {
		if (array[0] == element) {
			return true;
		} else {
			return false;
		}
	}
};

const getFormData = (): FormData => {
	return {
		length: inputRange.value,
		specialCharacters: inputSpecialCharacters.checked,
		capitalLetter: inputCapitalLetter.checked,
	};
};

const includeSpecialCharacter = (array: string[]): string[] => {
	const specialCharactersArray = lettersArray.concat(array);
	return specialCharactersArray;
};

const firtCapitalLetter = (array: string[]): string[] => {
	const firstLetter = array.shift();
	const capitalLetter = firstLetter!.toUpperCase();
	const newArray = [capitalLetter, ...array];
	return newArray;
};

const shuffleArray = (array: string[], passwordLength: number): string[] => {
	let newArray = [...array];
	const length = newArray.length;
	for (let i = 0; i < length; i++) {
		const randomPosition = Math.floor((newArray.length - i) * Math.random());
		const randomItem = newArray.splice(randomPosition, 1);

		newArray.push(...randomItem);
	}
	return newArray.slice(0, passwordLength);
};

const generatePassword = (getFormData: () => {}) => {
	let finalArray: string[] = [...lettersArray];
	let finalPassword;
	const data: FormData = getFormData();
	const { length, specialCharacters, capitalLetter } = data;

	if (specialCharacters) {
		finalArray = includeSpecialCharacter(charactersArray);
	}

	finalArray = shuffleArray(finalArray, Number(length));

	if (capitalLetter) {
		finalArray = firtCapitalLetter(finalArray);
	}

	finalPassword = finalArray!.join('');
	const valid = validate(finalArray, charactersArray);
	if (valid) {
		return;
	}
	result.textContent = finalPassword;
};

form.addEventListener('submit', e => {
	e.preventDefault();
	generatePassword(getFormData);
});
