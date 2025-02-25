import React from 'react';

function TagSelector({ availableTags, tagIds, onTagChange }) {
    return (
        <div>
            <h4>Выберите теги:</h4>
            {availableTags.map(tag => (
                <div key={tag.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={tagIds.includes(tag.id)} // Проверка наличия тега в выбранных
                            onChange={() => onTagChange(tag.id)} // Обработчик изменения
                        />
                        {tag.tagName} ({tag.tagColor})
                    </label>
                </div>
            ))}
        </div>
    );
}

export default TagSelector;
