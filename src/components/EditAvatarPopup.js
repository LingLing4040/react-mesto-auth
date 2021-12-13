import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, handlePopupClick }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='avatar'
            onClose={onClose}
            isOpened={isOpen}
            buttonTitle='Сохранить'
            onPopupClick={handlePopupClick}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <input
                    name='avatar'
                    id='avatar-link-input'
                    type='url'
                    placeholder='Ссылка на картинку'
                    className='popup__input popup__input_type_avatar-link'
                    required
                    ref={avatarRef}
                />
                <span className='popup__error avatar-link-input-error'></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
