import React from 'react';
import { Link } from 'react-router-dom';
import { deleteBoard } from '../utils/api';

const BoardList = ({ boards, onBoardDeleted }) => {
    const handleDelete = async(boardId) => {
        if(window.confirm('Do you want to delete?')){
            try{
                await deleteBoard(boardId);
                if(onBoardDeleted){
                    onBoardDeleted();
                }
            }catch (error) {
                alert("Failed to delete board");
            }
        }
    };

    return(
        <div className = "board-grid">
            {boards.map((board)=>(
                <div key={board.id} className = "board-card">
                    <div className="board-image">
                        <img src={board.image} alt={board.title}></img>
                    </div>
                    <div className = "board-content">
                        <h3>{board.title}</h3>
                        <p>{board.description}</p>
                        <div className = "board-meta">
                            <span className = "category">{board.category}</span>
                            {board.author && <span className="author">by {board.author}</span>}
                        </div>
                        <div className="board-actions">
                            <Link to={`/board.${board.id}`} className="view-btn">View Board</Link>
                            <button className="delete-btn" onClick={()=> handleDelete(board.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardList;