const storyTextElement = document.getElementById('story-text');
const choicesContainerElement = document.getElementById('choices-container');
const earningsElement = document.getElementById('earnings');

let state = {
    earnings: 0.00
};

function startGame() {
    state = { earnings: 0.00 };
    showStoryNode(1);
}

function showStoryNode(storyNodeId) {
    const storyNode = storyNodes.find(node => node.id === storyNodeId);
    storyTextElement.innerHTML = storyNode.text;

    while (choicesContainerElement.firstChild) {
        choicesContainerElement.removeChild(choicesContainerElement.firstChild);
    }

    storyNode.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('choice-button');
        button.addEventListener('click', () => selectChoice(choice));
        choicesContainerElement.appendChild(button);
    });
    
    earningsElement.innerText = state.earnings.toFixed(2);
}

function selectChoice(choice) {
    const nextNodeId = choice.nextNode;
    if (choice.setEarnings !== undefined) {
        state.earnings = choice.setEarnings;
    }
    if (choice.addEarnings) {
        state.earnings += choice.addEarnings;
    }
    if (!nextNodeId) {
        return;
    }
    showStoryNode(nextNodeId);
}

const storyNodes = [
    {
        id: 1,
        text: 'You are a Lithuanian immigrant in Chicago, 1906. The factory whistle blows at 7 AM. The rule is, "a man who was one minute late was docked an hour." But you also know the bosses often don\'t start work until 10 or 11 AM. What do you do?',
        choices: [
            { text: 'Arrive at 6:45 AM to be safe.', nextNode: 2 },
            { text: 'Arrive one minute late.', nextNode: 3 }
        ]
    },
    {
        id: 2,
        text: 'You arrive early. Just as the text describes, you are forced to "loaf around, in a place where the thermometer might be twenty degrees below zero" for hours, unpaid. Finally, the cattle arrive and the line starts.',
        choices: [{ text: 'Begin the workday...', nextNode: 4 }]
    },
    {
        id: 3,
        text: 'You are docked an hour\'s pay (about 17 cents) for being one minute late. You are furious, but you must work. The line starts.',
        choices: [{ text: 'Begin the workday...', setEarnings: -0.17, nextNode: 4 }]
    },
    {
        id: 4,
        text: 'The economy is in a slump. The line runs for only a short time before slowing to a halt. You wait around for more work, but none comes. Your day is over. The foreman calculates your time.',
        choices: [
            { text: 'See my earnings.', addEarnings: 0.35, nextNode: 5 }
        ]
    },
    {
        id: 5,
        text: 'The foreman says you worked just enough to be credited for two hours, earning you 35 cents for the full day. Before you leave, you walk past the sausage-making room. You see meat that has "tumbled out on the floor, in the dirt and sawdust," near a pile of poisoned bread set out for rats.',
        choices: [
            { text: 'Ignore it and go home.', nextNode: 6 },
            { text: 'Tell the foreman about the dirty meat.', nextNode: 7 }
        ]
    },
    {
        id: 6,
        text: 'You keep your head down and walk away. You know that the dirty meat, and maybe even the dead rats, will "go into the hoppers together." But you have a family to feed and can\'t risk your job.',
        choices: [{ text: 'Finish the day.', nextNode: 8 }]
    },
    {
        id: 7,
        text: 'You point out the filth to the foreman. He scoffs and tells you to get back to your station or you\'ll lose your job. "Do you want to work or not?" he growls. You see another worker quietly sweep the mess into a cart with other meat scraps.',
        choices: [{ text: 'Finish the day.', nextNode: 8 }]
    },
    {
        id: 8,
        text: 'It\'s lunchtime, but there is "no place for the men to wash their hands." You see others rinsing their hands in the water barrel that will later be "ladled into the sausage."',
        choices: [
            { text: 'Wash your hands in the sausage water.', nextNode: 9 },
            { text: 'Eat with dirty hands.', nextNode: 9 }
        ]
    },
    {
        id: 9,
        text: 'With your meager earnings, you head home, feeling chilled, exhausted, and cheated. You are "no longer perplexed when [you] hear men talk of fighting for their rights." Down the street, you hear the passionate shouts of a union meeting.',
        choices: [
            { text: 'Go to the union meeting.', nextNode: 10 },
            { text: 'Go home. It\'s too risky.', nextNode: 11 }
        ]
    },
    {
        id: 10,
        text: 'You enter the meeting. The speaker declares, "Their one chance for life was in union!" You have discovered "brothers in affliction, and allies." The fight for reform has begun.<br><br><strong>THE END</strong>',
        choices: [{ text: 'Play Again', nextNode: 1 }]
    },
    {
        id: 11,
        text: 'You walk home, defeated. The system is too big, the companies too powerful. You will return to the factory tomorrow, hoping for a few more cents to survive.<br><br><strong>THE END</strong>',
        choices: [{ text: 'Play Again', nextNode: 1 }]
    },
];

startGame();
