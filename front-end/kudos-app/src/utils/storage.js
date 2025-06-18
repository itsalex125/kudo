const STORAGE_KEYS = {
    BOARDS: 'kudo_boards',
    CARDS: 'kudo_cards'
};

export const getBoards = () => {
    const boards = localStorage.getItem(STORAGE_KEYS.BOARDS);
    return boards ? JSON.parse(boards) : [];
}

export const saveBoards = (boards) => {
    localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
};

export const getCards = () => {
    const cards = localStorage.getItem(STORAGE_KEYS.CARDS);
    return cards ? JSON.parse(cards) : [];
};

export const saveCards = (cards) =>{
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
};

export const addBoard = (board) => {
    const boards = getBoards();
    const newBoard = {
        ...board,
        id: Date.now().toString(),
        createdAt: new Data().toISOString(),
        updatedAt: new Data().toISOString()
    };
    boards.push(newBoard);
    saveBoards(boards);
    return newBoard;
};

export const deleteBoard = (boardId) => {
    const boards = getBoards().filter(board => board.id !== boardId);
    saveBoards(boards);
    const cards = getCards().filter(card => card.boardId !== boardId);
    saveCards(cards);
};

export const addCard = (card) =>{
    const cards = getCards();
    const newCard = {
        ...card,
        id: Date.now().toString(),
        upvotes: 0,
        createdAt: new Date.toISOString()
    };
    cards.push(newCard);
    saveCards(cards);
    return newCard;    
};

export const deleteCard = (cardId) => {
    const cards = getCards().filter(card => card.id !== cardId);
    saveCards(cards);
};

export const updateCardUpvotes = (cardId, upvotes) => {
    const cards = getCards();
    const updatedCards = cards.map(card =>
        card.id === cardId ? {...card, upvotes } : card
    );
    saveCards(updatedCards);
};