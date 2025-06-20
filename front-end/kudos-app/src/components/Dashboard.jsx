import React, { useEffect, useState} from 'react';
import BoardList from './BoardList';
import CreateBoardModal from './CreateBoardModal';
import { fetchBoards } from '../utils/api';

const Dashboard = () =>{
    const [boards, setBoards] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const loadBoards = async () => {
            const boardsData = await fetchBoards();
            setBoards(boardsData);
            setLoading(false);
    }
    useEffect(() => {
        loadBoards();
        const interval = setInterval(loadBoards, 2000);
        return () => clearInterval(interval);
    }, []);

    const filteredBoards = boards.filter( board => {
        const matchesCategory = selectedCategory === 'all' || board.category === selectedCategory;
        const matchesSearch = board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            board.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleBoardCreated = () => {
        setShowCreateModal(false);
        loadBoards();
    };

    if(loading){
        return(
            <div className= "dashboard">
                <div className="loading">Loading boards...</div>
            </div>
        );
    }

    return(
        <div className = "dashboard">
            <header className="dashboard-header">
                <h1>KudoBoard</h1>
                <button className="create-board-btn" onClick={() => setShowCreateModal(true)}>
                    Create New Board
                </button>
            </header>
            <div className="filters">
                <input 
                    type="text"
                    placeholder="Search boards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"></input>
                <div className="category-filters">
                    <button
                        className = {selectedCategory === 'all' ? 'active' : ''}
                        onClick={() => setSelectedCategory('all')}>
                            All
                    </button>
                    <button
                        className = {selectedCategory === 'recent' ? 'active' : ''}
                        onClick={() => setSelectedCategory('recent')}>
                            Recent
                    </button>
                    <button
                        className = {selectedCategory === 'celebration' ? 'active' : ''}
                        onClick={() => setSelectedCategory('celebration')}>
                            Celebration
                    </button>
                    <button
                        className = {selectedCategory === 'thank-you' ? 'active' : ''}
                        onClick={() => setSelectedCategory('thank-you')}>
                            Thank You
                    </button>
                    <button
                        className = {selectedCategory === 'inspiration' ? 'active' : ''}
                        onClick={() => setSelectedCategory('inspiration')}>
                            Inspiration
                    </button>
                </div>
            </div>
            {boards.length === 0 ? (
                <div className="welcome-board">
                    <h2>Welcome to KudoBoard!</h2>
                    <p>Get started by creating your first board.</p>
                    <button className="create-first-board-btn" onClick={() => setShowCreateModal(true)}>Create Your First Board</button>
                </div>
            ) : (
                <BoardList boards = {filteredBoards} onBoardDeleted={loadBoards}/>
            )}
            {showCreateModal && (
                <CreateBoardModal onClose={() => setShowCreateModal(false)} onBoardCreated={handleBoardCreated}/>
            )}
        </div>
    );
};

export default Dashboard;