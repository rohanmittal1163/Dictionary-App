const input = document.querySelector('input');
const container = document.querySelector('.container');
const cross = document.querySelector('.cross');
const footer = document.querySelector('.footer');
const word = document.querySelector('.word');
const footer2 = document.querySelector('.footer2');
const adjective = document.querySelector('.adjective');
const meaning = document.querySelector('.meaning');
const example = document.querySelector('.example');
const synonyms = document.querySelector('.synonyms');
const speak = document.querySelector('.speak');

window.onkeydown = (e) => {
	if (e.keyCode == 191) {
		input.focus();
	}
};
input.onkeydown = (e) => {
	if (e.keyCode == 13) {
		fetchingDetails();
	}
};

speak.onclick = () => {
	const utterance = new SpeechSynthesisUtterance(input.value);
	speechSynthesis.speak(utterance);
};
input.oninput = () => {
	if (input.value != '') {
		cross.classList.add('show');
		cross.classList.remove('hide');
	} else {
		cross.classList.add('hide');
		cross.classList.remove('show');
	}
};

cross.onclick = () => {
	input.value = '';
	input.focus();
	cross.classList.add('hide');
	cross.classList.remove('show');
};
function fetchingDetails() {
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
		.then((response) => {
			return response.json();
		})
		.then((info) => {
			if (info.title == 'No Definitions Found') {
				footer.style.display = 'block';
				footer.innerHTML = info.title;
				footer.style.color = 'brown';
				footer.style.fontWeight = 'bold';
				container.style.height = '210px';
				footer2.classList.add('invisible');
				footer2.classList.remove('visible');

				setTimeout(() => {
					footer.innerHTML = `Type a word and press Enter to get the meaning, example, pronunciation,
                    and synonyms of that typed word`;
					footer.style.color = 'grey';
					footer.style.fontWeight = 'normal';
				}, 1000);
				input.value = '';
			} else {
				footer.innerHTML = `Searching the meaning of <b>${input.value}</b>`;
				setTimeout(() => {
					footer.style.display = 'none';
					container.style.height = 'auto';
					footer2.classList.add('visible');
					footer2.classList.remove('invisible');

					word.innerHTML = input.value;
					adjective.innerHTML =
						info[0].meanings[0].partOfSpeech +
						' ' +
						(info[0].phonetics[0].text ?? '____');
					meaning.innerText = info[0].meanings[0].definitions[0].definition;
					example.innerHTML =
						info[0].meanings[0].definitions[0].example ?? '_______';

					if (info[0].meanings[0].synonyms.length) {
						synonyms.innerHTML = info[0].meanings[0].synonyms
							.map((item) => {
								return `<li>${item}</li>`;
							})
							.join(',');
					} else {
						synonyms.innerHTML = '_____';
					}
				}, 1000);
			}
		})
		.catch((err) => {
			console.log(err);
		});
}
