const {
    Message
} = require("botbuilder");

function getBasicAdaptiveCard() {
    const action = {
        type: 'Action.OpenUrl',
        url: 'https://help.github.com/articles/git-and-github-learning-resources/',
        title: 'Learn More'
    };

    return {
        type: 'AdaptiveCard',
        version: '1.0',
        body: [{
                type: 'TextBlock',
                text: 'GitHub',
                size: 'large'
            },
            {
                type: 'TextBlock',
                text: 'GitHub is a free to use git source control host. Where you can upload your code to and share with others.',
                wrap: true
            }
        ],
        actions: [action]
    };
}

function getAdaptiveCardAttachment() {
    adaptiveCard = getBasicAdaptiveCard();

    return {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: adaptiveCard
    };
}

module.exports.getGitHubCardMessage = function () {
    return new Message().addAttachment(getAdaptiveCardAttachment()).toMessage();
}