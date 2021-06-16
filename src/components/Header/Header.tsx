import './Header.css';

function Header() {
    return (
        <div className = 'header-container'>
            <div className = 'header-content-container'>
                <div className = 'header-main-content'>
                    MOCKVIEW
                </div>
                <div className = 'header-side-content-container'>
                    <div className = 'header-side-content'>
                        About Us
                    </div>
                    <div className = 'header-side-content'>
                        FAQs
                    </div>
                    <div className = 'header-side-content'>
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;