let data = [
	{
		headline: 'Former Prime Minister found guilty of religious crime.',
		text: 'AGHORA finds solid evidence to allow the arrest of Marendra Nodi.',
		index: 'A'
	},
	{
		headline: 'India signs bilateral trade agreement with Pakistan',
		text: 'The PM thanks AGHORA and hence the people of India for generating right!',
		index: 'A'
	},
	{
		headline: 'Flood preparations prove vital',
		text: 'Peoples decision to allow AGHORA to establish flood safety procedures find use.',
		index: 'A'
	},
	{
		headline: '1Former Prime Minister found guilty of religious crime.',
		text: 'AGHORA finds solid evidence to allow the arrest of Marendra Nodi.',
		index: 'A'
	},
	{
		headline: '2India signs bilateral trade agreement with Pakistan',
		text: 'The PM thanks AGHORA and hence the people of India for generating right!',
		index: 'A'
	},
	{
		headline: '3Flood preparations prove vital',
		text: 'Peoples decision to allow AGHORA to establish flood safety procedures find use.',
		index: 'A'
	},
	{
		headline: '4Former Prime Minister found guilty of religious crime.',
		text: 'AGHORA finds solid evidence to allow the arrest of Marendra Nodi.',
		index: 'A'
	},
	{
		headline: '5India signs bilateral trade agreement with Pakistan',
		text: 'The PM thanks AGHORA and hence the people of India for generating right!',
		index: 'A'
	},
	{
		headline: '6Flood preparations prove vital',
		text: 'Peoples decision to allow AGHORA to establish flood safety procedures find use.',
		index: 'A'
	}
];

exports.selectRandomQuestions = async () => {
	let arr = [];
	while (arr.length < 3) {
		const rand = Math.floor(Math.random() * data.length - 1) + 1;
		if (arr.indexOf(rand) == -1) {
			arr.push(rand);
		}
	}
	let news = [];
	for (let index of arr) {
		news.push(data[index]);
	}
	return news;
};
