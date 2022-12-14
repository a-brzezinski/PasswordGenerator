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

const getFormData = (): FormData => {
	return {
		length: inputRange.value,
		specialCharacters: inputSpecialCharacters.checked,
		capitalLetter: inputCapitalLetter.checked,
	};
};

const includeSpecialCharacters = <T>(
	specialCharacter: boolean | T,
	charactersArray: string[]
): void | number => {
	if (specialCharacter) {
		return lettersArray.push(...charactersArray);
	} else {
		return;
	}
};

const firstLetterCapital = <T>(capitalLetter: boolean | T): boolean =>
	capitalLetter ? true : false;

const shuffleArray = (
	array: string[],
	passwordLength: number,
	capitalUse: boolean
): string[] | undefined => {
	let newArray = [...array];
	const length = newArray.length;
	for (let i = 0; i < length; i++) {
		const randomPosition = Math.floor((newArray.length - i) * Math.random());
		const randomItem = newArray.splice(randomPosition, 1);

		newArray.push(...randomItem);
	}

	if (capitalUse) {
		const firstLetter = newArray.shift();
		if (firstLetter === '?' || firstLetter === '!') {
			return;
		}
		const capitalLetter = firstLetter!.toUpperCase();
		newArray.unshift(capitalLetter);
	} else {
		newArray.slice(0, passwordLength);
	}

	return newArray.slice(0, passwordLength);
};

const generatePassword = (getFormData: () => {}) => {
	const data: FormData = getFormData();
	const { length, specialCharacters, capitalLetter } = data;

	includeSpecialCharacters(specialCharacters, charactersArray);
	const capital = firstLetterCapital(capitalLetter);

	const shuffledArray = shuffleArray(lettersArray, Number(length), capital);
	const password = shuffledArray!.join('');
	result.textContent = password;
};

form.addEventListener('submit', e => {
	e.preventDefault();
	generatePassword(getFormData);
});
