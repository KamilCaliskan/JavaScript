function hand(holeCards, communityCards) {
    // Tüm kartları birleştir
    const allCards = holeCards.concat(communityCards);

    // Kart rütbeleri ve renkleri
    const ranks = "23456789TJQKA".split("");
    const suits = ["♠", "♦", "♣", "♥"];
    const rankCounts = {};
    const suitCounts = {};
    const cardsBySuit = {};

    // Kartları say ve organize et
    allCards.forEach(card => {
        const rank = card[0]; // Kart rütbesi (ör. "A", "K", "2")
        const suit = card.slice(1); // Kart rengi (ör. "♠", "♥")
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
        suitCounts[suit] = (suitCounts[suit] || 0) + 1;
        if (!cardsBySuit[suit]) cardsBySuit[suit] = [];
        cardsBySuit[suit].push(rank);
    });

    // Rütbeleri sırala
    const sortedRanks = Object.keys(rankCounts)
        .sort((a, b) => ranks.indexOf(b) - ranks.indexOf(a));
    
    // Flush kontrolü
    const flushSuit = Object.keys(suitCounts).find(suit => suitCounts[suit] >= 5);
    let flushRanks = [];
    if (flushSuit) {
        flushRanks = cardsBySuit[flushSuit]
            .sort((a, b) => ranks.indexOf(b) - ranks.indexOf(a));
    }

    // Straight kontrolü
    const checkStraight = (sorted) => {
        for (let i = 0; i <= sorted.length - 5; i++) {
            const slice = sorted.slice(i, i + 5);
            if (slice.every((rank, idx) => idx === 0 || ranks.indexOf(slice[idx - 1]) - ranks.indexOf(rank) === 1)) {
                return slice;
            }
        }
        return null;
    };
    const straightRanks = checkStraight(sortedRanks);

    // Straight-flush kontrolü
    let straightFlushRanks = null;
    if (flushRanks.length >= 5) {
        straightFlushRanks = checkStraight(flushRanks);
    }

    // En iyi eli belirleme
    if (straightFlushRanks) {
        return { type: "straight-flush", ranks: straightFlushRanks };
    }
    const fourOfAKind = Object.keys(rankCounts).find(rank => rankCounts[rank] === 4);
    if (fourOfAKind) {
        const kicker = sortedRanks.find(rank => rank !== fourOfAKind);
        return { type: "four-of-a-kind", ranks: [fourOfAKind, kicker] };
    }
    const threeOfAKind = Object.keys(rankCounts).find(rank => rankCounts[rank] === 3);
    const pairs = Object.keys(rankCounts).filter(rank => rankCounts[rank] === 2);
    if (threeOfAKind && pairs.length) {
        return { type: "full house", ranks: [threeOfAKind, pairs[0]] };
    }
    if (flushRanks.length >= 5) {
        return { type: "flush", ranks: flushRanks.slice(0, 5) };
    }
    if (straightRanks) {
        return { type: "straight", ranks: straightRanks };
    }
    if (threeOfAKind) {
        const kickers = sortedRanks.filter(rank => rank !== threeOfAKind).slice(0, 2);
        return { type: "three-of-a-kind", ranks: [threeOfAKind, ...kickers] };
    }
    if (pairs.length >= 2) {
        const [highPair, lowPair] = pairs.slice(0, 2);
        const kicker = sortedRanks.find(rank => rank !== highPair && rank !== lowPair);
        return { type: "two pair", ranks: [highPair, lowPair, kicker] };
    }
    if (pairs.length === 1) {
        const pair = pairs[0];
        const kickers = sortedRanks.filter(rank => rank !== pair).slice(0, 3);
        return { type: "pair", ranks: [pair, ...kickers] };
    }
    // Yüksek kart
    return { type: "nothing", ranks: sortedRanks.slice(0, 5) };
}
