const API_BASE_URL = 'http://localhost:9009';

export const fetchBoards = async () => {
    try{
        const response = await fetch(`${API_BASE_URL}/board`);
        if (!response.ok) throw new Error('Failed to fetch the boards');
        return await response.json();
    } catch (error){
        return [];
    }
};

export const fetchBoard = async(boardId) =>{
    try{
        const response = await fetch(`${API_BASE_URL}/board/${boardId}`);
        if (!response.ok) throw new Error('Failed to fetch the boards');
        return await response.json();
    } catch (error){
        return null;
    }
};

export const createBoard = async (boardData) => {
    try{
        const response = await fetch(`${API_BASE_URL}/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardData),
        });
        if (!response.ok) throw new Error('Failed to create the board');
        return await response.json();
    }catch(error) {
        throw error;
    }
};

export const updateBoard = async (boardId, boardData) => {
    try{
        const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardData),
        });
        if (!response.ok) throw new Error('Failed to update the board');
        return await response.json();
    } catch(error) {
        throw error;
    }
};

export const deleteBoard = async (boardId) => {
    try{
        const response = await fetch(`${API_BASE_URL}/board/${boardId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete the board');
        return await response.json();
    } catch(error) {
        throw error;
    }
};

export const fetchCards = async () => {
    try{
        const response = await fetch(`${API_BASE_URL}/card`);
        if (!response.ok) throw new Error('Failed to fetch the cards');
        return await response.json();
    } catch (error){
        return [];
    }
};

export const fetchBoardCards = async(boardId) =>{
    try{
        const resposne = await fetch(`${API_BASE_URL}/card/board/${boardId}`);
        if (!resposne.ok) throw new Error('Failed to fetch the board cards');
        return await resposne.json();
    } catch (error){
        return [];
    }
};

export const createCard = async (cardData) => {
    try{
        const response = await fetch(`${API_BASE_URL}/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });
        if (!response.ok) throw new Error('Failed to create the card');
        return await response.json();
    }catch(error) {
        throw error;
    }
};

export const updateCard = async (cardId, cardData) => {
    try{
        const response = await fetch(`${API_BASE_URL}/card/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });
        if (!response.ok) throw new Error('Failed to update the card');
        return await response.json();
    } catch(error) {
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try{
        const response = await fetch(`${API_BASE_URL}/card/${cardId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete the card');
        return await response.json();
    } catch(error) {
        throw error;
    }
};

export const updateCardUpvotes = async (cardId, upvotes) => {
    return updateCard(cardId, { upvotes });
}