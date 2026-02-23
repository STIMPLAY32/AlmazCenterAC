document.addEventListener('DOMContentLoaded', () => {
    const textBlock = document.querySelector('.what-we-doing');
    if (textBlock) {
        const text = textBlock.textContent.trim();
        if (text) {
            const words = text.split(/\s+/);
            textBlock.textContent = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word;
                span.style.setProperty('--i', String(index));
                textBlock.appendChild(span);
            });
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        return;
    }

    const status = document.getElementById('contactStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById('senderEmail');
        const messageInput = document.getElementById('senderMessage');
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!email || !message) {
            if (status) {
                status.textContent = 'Заполните все поля.';
                status.className = 'contact-status contact-status-error';
            }
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
        }

        if (status) {
            status.textContent = 'Отправляем сообщение...';
            status.className = 'contact-status';
        }

        try {
            const response = await fetch('https://formsubmit.co/ajax/zakir.ahmadov2009@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email,
                    message,
                    _subject: 'Новое сообщение с сайта Almaz Center',
                    _captcha: 'false'
                })
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            if (status) {
                status.textContent = 'Сообщение отправлено. Спасибо!';
                status.className = 'contact-status contact-status-success';
            }

            contactForm.reset();
        } catch (error) {
            if (status) {
                status.textContent = 'Ошибка отправки. Попробуйте еще раз.';
                status.className = 'contact-status contact-status-error';
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить';
            }
        }
    });
});
