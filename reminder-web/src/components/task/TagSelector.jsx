import React from 'react';

function TagSelector({ availableTags, tagIds, onTagChange }) {
    return (
        <div className="tag-selector-container">
            <h4>Выберите теги:</h4>
            {availableTags.map(tag => (
                <div key={tag.id} className="tag-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={tagIds.includes(tag.id)}
                            onChange={() => onTagChange(tag.id)}
                            className="tag-checkbox"
                        />
                        {tag.tagName} ({tag.tagColor})
                    </label>
                </div>
            ))}
        </div>
    );
}

export default TagSelector;