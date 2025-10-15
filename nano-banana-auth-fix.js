// 登录状态检查函数
function checkLoginStatus() {
    if (!currentUser) {
        // 显示登录提示
        showLoginPrompt();
        return false;
    }
    return true;
}

// 显示登录提示弹窗
function showLoginPrompt() {
    // 创建登录提示模态框
    const modal = document.createElement('div');
    modal.id = 'login-prompt-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            <div style="
                font-size: 48px;
                margin-bottom: 16px;
            ">🔒</div>
            <h3 style="
                margin: 0 0 16px 0;
                color: #333;
                font-size: 20px;
                font-weight: 600;
            ">需要登录才能生成图像</h3>
            <p style="
                margin: 0 0 24px 0;
                color: #666;
                line-height: 1.5;
            ">为了产品安全，请登录后再进行生成</p>
            <div style="
                display: flex;
                gap: 12px;
                justify-content: center;
            ">
                <button id="login-prompt-login" style="
                    background: #4285f4;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='#3367d6'" onmouseout="this.style.background='#4285f4'">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style="width: 18px; height: 18px;">
                    立即登录
                </button>
                <button id="login-prompt-cancel" style="
                    background: #f5f5f5;
                    color: #666;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                    取消
                </button>
            </div>
        </div>
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        </style>
    `;
    
    document.body.appendChild(modal);
    
    // 添加事件监听器
    document.getElementById('login-prompt-login').addEventListener('click', function() {
        closeLoginPrompt();
        googleLogin();
    });
    
    document.getElementById('login-prompt-cancel').addEventListener('click', function() {
        closeLoginPrompt();
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLoginPrompt();
        }
    });
    
    // ESC键关闭
    const handleEsc = function(e) {
        if (e.key === 'Escape') {
            closeLoginPrompt();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// 关闭登录提示弹窗
function closeLoginPrompt() {
    const modal = document.getElementById('login-prompt-modal');
    if (modal) {
        modal.remove();
    }
}


