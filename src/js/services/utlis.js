// {value: 'QD'}
export const calculateCardsSum = (cards) => {
    let aces = []
    let sum = 0
    cards.forEach((card) => {
        if (card.value[0] === 'A') {
            aces.push(card)
        } else {
            sum += getCardValue(card)
        }
    })
    if (aces.length) {
        aces.forEach(() => {
            if (sum + 11 > 21) {
                sum += 1
            } else {
                sum += 11
            }
        })
    }
    return sum
}

export const addCardSum = (sum, card) => {
    if (card.value[0] === 'A') {
        if (sum + 11 > 21) return sum + 1
        else return sum + 11
    }
    const cardValue = getCardValue(card)
    return cardValue + sum;
}

export const getCardValue = (card) => {
    switch (card.value[0]) {
        case 'J':
        case 'Q':
        case 'K':
            return 10;
        case 'A':
            return 11;
        default:
            return +card.value;
    }
}

export const formatMoney = (n) => {
    return "$" + (Math.round(n * 100) / 100).toLocaleString();
}