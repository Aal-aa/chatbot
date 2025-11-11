(function (window, document) {
  const chatbotSDK = {
    run(config) {
      if (!config || !config.baseUrl) {
        console.error("Chatbot SDK: Missing baseUrl in config");
        return;
      }

      document.addEventListener("DOMContentLoaded", () => {
        // Inject chatbot HTML
        const chatbotHTML = `
          <button id="chatbot-float-btn"><i class="fas fa-comments"></i></button>
          <div id="chatbot-container">
            <div id="chatbot-header">
              <div class="chatbot-info">
                <div class="chatbot-name">
                  <h3>AI Assistant</h3>
                  <span class="status">Typically replies in a few minutes</span>
                </div>
              </div>
              <button id="chatbot-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div id="chatbot-messages"></div>
            <form id="chatbot-form">
              <input id="chatbot-input" type="text" placeholder="Type your message..." required>
              <button id="chatbot-send-btn" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M12.8184 0.111328C13.6088 0.00766038 14.343 -0.0317432 14.9561 0.0273438C15.5395 0.0835859 16.1505 0.240675 16.54 0.660156C16.9179 1.06719 17.0418 1.67918 17.0742 2.26172C17.1084 2.87607 17.0471 3.60969 16.9229 4.39941C16.6736 5.98313 16.1561 7.88893 15.5352 9.71582C14.914 11.5435 14.1797 13.3205 13.4863 14.6455C13.1415 15.3045 12.7948 15.8749 12.4648 16.2871C12.3006 16.4922 12.1229 16.6804 11.9346 16.8203C11.7559 16.9529 11.4956 17.0957 11.1826 17.082C10.6793 17.0598 10.2968 16.7838 10.0156 16.4189C9.74619 16.0692 9.53284 15.5947 9.34375 15.0469C8.96462 13.9483 8.6085 12.328 8.14941 10.2402C8.05093 9.79245 7.96796 9.63998 7.89355 9.55957C7.87768 9.54246 7.85764 9.52529 7.83301 9.50684C7.80704 9.49299 7.78202 9.47773 7.75781 9.45996C7.66243 9.40681 7.51362 9.34482 7.2627 9.27441C7.00201 9.20128 6.60646 9.12104 6.1084 9.01953C5.95541 8.98835 5.79264 8.95546 5.62109 8.91992C4.91173 8.77295 4.08641 8.59141 3.30176 8.35742C2.5254 8.12591 1.74417 7.82972 1.14453 7.4375C0.557175 7.05322 0.00522186 6.4808 0 5.6709C-0.00191942 5.36253 0.142865 5.10663 0.280273 4.92676C0.42437 4.73819 0.616262 4.56097 0.826172 4.39648C1.2479 4.06607 1.82823 3.72181 2.49707 3.38184C3.84114 2.69866 5.63637 1.98523 7.47754 1.39258C9.31745 0.800346 11.233 0.319274 12.8184 0.111328ZM14.8359 1.27148C14.355 1.22515 13.7249 1.25295 12.9805 1.35059C11.496 1.54532 9.65887 2.00408 7.86035 2.58301C6.06289 3.16159 4.33283 3.85089 3.06348 4.49609C2.42599 4.82013 1.92742 5.12159 1.59766 5.37988C1.4319 5.50975 1.32891 5.61295 1.27344 5.68555C1.26503 5.69655 1.25894 5.70631 1.25391 5.71387C1.27589 5.88937 1.41127 6.11829 1.8291 6.3916C2.27643 6.6842 2.91992 6.93873 3.65918 7.15918C4.39005 7.37712 5.17211 7.54968 5.875 7.69531C6.02563 7.72652 6.17442 7.75761 6.31934 7.78711C6.8304 7.89116 7.29191 7.98469 7.60059 8.07129C7.73729 8.10965 7.8706 8.15128 7.99902 8.19922L10.5996 5.59961C10.8437 5.35553 11.2403 5.35553 11.4844 5.59961C11.7281 5.84368 11.7282 6.23943 11.4844 6.4834L9.00195 8.96387C9.18732 9.25874 9.28895 9.60266 9.37012 9.97168C9.8368 12.094 10.1758 13.6269 10.5254 14.6396C10.7006 15.1474 10.8613 15.4686 11.0059 15.6562C11.086 15.7602 11.1442 15.8028 11.1836 15.8203C11.1854 15.819 11.1875 15.8178 11.1895 15.8164C11.2584 15.7652 11.3589 15.6675 11.4883 15.5059C11.7455 15.1846 12.0496 14.6948 12.3789 14.0654C13.0341 12.8132 13.7445 11.0996 14.3516 9.31348C14.9589 7.52651 15.4532 5.69407 15.6875 4.20508C15.805 3.45861 15.8535 2.82185 15.8262 2.33105C15.7971 1.80909 15.6889 1.58074 15.624 1.51074C15.5598 1.44157 15.3465 1.32069 14.8359 1.27148Z" fill="#94969C"/>
                </svg>
              </button>
            </form>
            <h5 class="Powered-by-Pair">Powered by <span>PairAi</span></h5>
          </div>
        `;

        // Add Font Awesome
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(style);
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // Inject CSS
        const css = document.createElement('style');
        css.textContent = `
          body{font-family:'Poppins',sans-serif;}
          #chatbot-float-btn{position:fixed;bottom:25px;right:25px;width:60px;height:60px;border-radius:50%;background:#4D98E2;color:#fff;border:none;font-size:26px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;transition:0.3s;z-index:1000;}
          #chatbot-container{position:fixed;bottom:100px;right:25px;width:100%;max-width:420px;height:75vh;background:#F5F5F6;border-radius:20px;box-shadow:0 2px 14px rgba(0,0,0,0.15);display:none;flex-direction:column;overflow:hidden;z-index:999;}
          #chatbot-header{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;}
          #chatbot-close-btn{background:none;border:none;cursor:pointer;font-size:18px;}
          #chatbot-messages{flex-grow:1;padding:20px;overflow-y:auto;}
          #chatbot-form{display:flex;padding:12px;background:#fff;}
          #chatbot-input{flex:1;padding:10px;border-radius:20px;border:none;outline:none;}
          #chatbot-send-btn{background:none;border:none;cursor:pointer;}
        `;
        document.head.appendChild(css);

        // Handle logic
        const floatBtn = document.getElementById('chatbot-float-btn');
        const closeBtn = document.getElementById('chatbot-close-btn');
        const chatContainer = document.getElementById('chatbot-container');
        const messages = document.getElementById('chatbot-messages');
        const input = document.getElementById('chatbot-input');
        const form = document.getElementById('chatbot-form');

        floatBtn.addEventListener('click', () => {
          chatContainer.style.display = 'flex';
          floatBtn.style.display = 'none';
        });

        closeBtn.addEventListener('click', () => {
          chatContainer.style.display = 'none';
          floatBtn.style.display = 'flex';
        });

        const appendMessage = (text, sender) => {
          const msg = document.createElement('div');
          msg.textContent = text;
          msg.className = sender === 'me' ? 'msg-me' : 'msg-bot';
          messages.appendChild(msg);
          messages.scrollTop = messages.scrollHeight;
        };

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const text = input.value.trim();
          if (!text) return;
          appendMessage(text, 'me');
          input.value = '';
          setTimeout(() => appendMessage("You said: " + text, 'bot'), 1000);
        });
      });
    },
  };

  window.chatbotSDK = chatbotSDK;
})(window, document);
