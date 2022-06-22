import React from 'react'

function Footer() {
    const date = new Date()
    const currentYear = date.getFullYear()

    return (
    <div>
        <footer class="footer footer-center p-4 bg-sky-100 text-base-content mt-12">
        <div>
            <p>Copyright © {currentYear} - All right reserved by ChasingTheRain Pte Ltd</p>
        </div>
        </footer>
    </div>
    )
}

export default Footer