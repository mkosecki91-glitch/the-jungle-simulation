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
        text: 'You are a Lithuanian immigrant in Chicago, 1906. The factory whistle blows at 7 AM. The rule is, "a man who was one minute late was docked an hour." [cite: 21] What do you do?',
        choices: [
            { text: 'Arrive at 6:45 AM to be safe.', nextNode: 2 },
            { text: 'Arrive one minute late.', nextNode: 3 }
        ]
    },
    {
        id: 2,
        text: 'You arrive early. Just as the text describes, you are forced to "loaf around, in a place where the thermometer might be twenty degrees below zero" for hours, unpaid. [cite: 14] Finally, the line starts.',
        choices: [{ text: 'Begin the workday...', nextNode: 4 }]
    },
    {
        id: 3,
        text: 'You are docked an hour\'s pay (about 17 cents) for being one minute late. [cite: 21] You are furious, but you must work. The line starts.',
        choices: [{ text: 'Begin the workday...', setEarnings: -0.17, nextNode: 4 }]
    },
    {
        id: 4,
        text: 'Your first job is at the sausage hoppers. A cart of meat arrives. You see that some of it is "moldy and white" from old sausage that was rejected in Europe and sent back. [cite: 36] The foreman tells you to dose it with borax and glycerine and dump it in.',
        choices: [
            { text: 'Do as you are told and dump it all in.', nextNode: 5 },
            { text: 'Ask the foreman if this meat is safe.', nextNode: 5 }
        ]
    },
    {
        id: 5,
        text: 'The foreman glares at you for hesitating. "Just dump it," he says. You also notice meat that has "tumbled out on the floor, in the dirt and sawdust, where the workers had tramped and spit." [cite: 37] You are told to shovel this into the hopper as well.',
        choices: [
            { text: 'Shovel it all in. Speed is what matters.', nextNode: 6 },
            { text: 'Try to shake off the worst of the dirt.', nextNode: 6 }
        ]
    },
    {
        id: 6,
        text: 'Next, the foreman sends you to a dark storage room for more meat. A leaky roof drips water over great piles of meat, and "thousands of rats would race about on it." [cite: 38] It\'s too dark to see well, but as you grab a load, you can "sweep off handfuls of the dried dung of rats." [cite: 39]',
        choices: [
            { text: 'Wipe your hands and the meat as best you can.', nextNode: 7 },
            { text: 'Just grab the meat. There is no time to waste.', nextNode: 7 }
        ]
    },
    {
        id: 7,
        text: 'As you work, you notice the packers put out poisoned bread for the rats. Later, you see a horrifying sight: dead rats, the poisoned bread, and the meat are all shoveled into carts to go into the hoppers together. [cite: 40, 41] The man doing the shoveling doesn\'t even bother to lift out a rat when he sees one. [cite: 42]',
        choices: [
            { text: 'Keep your head down and say nothing.', nextNode: 8 },
            { text: 'Point out a dead rat to the shoveler.', nextNode: 8 }
        ]
    },
    {
        id: 8,
        text: 'A bit later, a load of pork needs to be made into "smoked" sausage. Because smoking takes time and is expensive, you are told to take it to the chemistry department. There, it is preserved with borax and colored brown with gelatine to make it look right. [cite: 44]',
        choices: [
            { text: 'Follow the instructions. It\'s not your problem.', nextNode: 9 },
            { text: 'This is wrong, but what can you do?', nextNode: 9 }
        ]
    },
    {
        id: 9,
        text: 'It\'s lunchtime, but there is "no place for the men to wash their hands." You see others rinsing their hands in the water barrel that will later be "ladled into the sausage." [cite: 44]',
        choices: [
            { text: 'Wash your hands in the sausage water.', nextNode: 10 },
            { text: 'Eat with dirty hands.', nextNode: 10 }
        ]
    },
    {
        id: 10,
        text: 'After lunch, the line runs for 50 minutes before slowing to a halt. The foreman tells you the day is over. Because you did not fill out the full hour, you get no pay for that "broken time." [cite: 25] The economy is in a slump, so you are credited for only two hours of work for the entire day. [cite: 15]',
        choices: [
            { text: 'Accept your meager pay of 35 cents.', addEarnings: 0.35, nextNode: 11 }
        ]
    },
    {
        id: 11,
        text: 'With your meager earnings, you head home, feeling chilled, exhausted, and cheated. You are "no longer perplexed when [you] hear men talk of fighting for their rights." [cite: 27] Down the street, you hear the passionate shouts of a union meeting.',
        choices: [
            { text: 'Go to the union meeting.', nextNode: 12 },
            { text: 'Go home. It\'s too risky.', nextNode: 13 }
        ]
    },
    {
        id: 12,
        text: 'You enter the meeting. The speaker declares, "Their one chance for life was in union!" [cite: 32] You have discovered "brothers in affliction, and allies." [cite: 31] The fight for reform has begun.<br><br><strong>THE END</strong>',
        choices: [{ text: 'Play Again', nextNode: 1 }]
    },
    {
        id: 13,
        text: 'You walk home, defeated. The system is too big, the companies too powerful. You will return to the factory tomorrow, hoping for a few more cents to survive.<br><br><strong>THE END</strong>',
        choices: [{ text: 'Play Again', nextNode: 1 }]
    }
];

startGame();
