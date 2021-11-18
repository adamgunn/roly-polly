import { useState } from 'react';

function ShareButtons(props) {
    // 0 = no copying was attempted
    // 1 = copy succeeded
    // 2 = copy failed
    const [clipboard_status, setClipBoardStatus] = useState(0);

    const copyLink = () => {
        navigator.clipboard
            .writeText(`https://rolypolly.herokuapp.com/polls/${props.pollId}`)
            .then(
                () => {
                    setClipBoardStatus(1);
                    setTimeout(() => {
                        setClipBoardStatus(0);
                    }, 10000);
                },
                () => {
                    setClipBoardStatus(2);
                    setTimeout(() => {
                        setClipBoardStatus(0);
                    }, 10000);
                }
            );
    };

    return (
        <div className="share_buttons_wrapper">
            <a
                className="share_button facebook_button"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frolypolly.herokuapp.com%2Fpolls%2F${props.pollId}&amp;src=sdkpreparse`}
            >
                <svg className="share_icon facebook_icon" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
            </a>
            <a
                className="share_button twitter_button"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=${encodeURI(
                    props.title
                )}&url=https%3A%2F%2Frolypolly.herokuapp.com%2Fpolls%2F${
                    props.pollId
                }`}
            >
                <svg className="share_icon twitter_icon" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
            </a>
            <a
                className="share_button reddit_button"
                rel="noopener noreferrer"
                target="_blank"
                href={`http://reddit.com/submit?title=${encodeURI(
                    props.title
                )}&url=https%3A%2F%2Frolypolly.herokuapp.com%2Fpolls%2F${
                    props.pollId
                }`}
            >
                <svg className="share_icon reddit_icon" viewBox="0 0 16 16">
                    <path d="M6.167 8a.831.831 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661zm1.843 3.647c.315 0 1.403-.038 1.976-.611a.232.232 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.203.203 0 0 0-.153.028.186.186 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256 2.577 0 4.668-1.451 4.668-3.256 0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z" />
                </svg>
            </a>
            {clipboard_status == 0 ? (
                <div
                    className="share_button copy_button"
                    onClick={copyLink}
                    title="Copy to clipboard"
                >
                    <svg className="share_icon copy_icon" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                    </svg>
                </div>
            ) : clipboard_status == 1 ? (
                <div
                    className="share_button copy_button"
                    title="The copy was successful."
                >
                    <svg className="share_icon copy_icon" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                </div>
            ) : (
                <div
                    className="share_button bad_copy_button"
                    title="The copy failed."
                >
                    <svg
                        className="share_icon bad_copy_icon"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default ShareButtons;
