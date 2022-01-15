import facebook from '../res/facebook.svg'
import github from '../res/github.svg'
import instagram from '../res/instagram.svg'

const Footer = () => {
    return (
        <footer>
            <div className="divider"></div>
            <div className='footer'>
                <div className='footer-container'>
                    <div>
                        <h2>404brand.</h2>
                        <p>it's not a product. <strong>it's a culture</strong></p>
                        <div>
                            <button className='social'><img src={facebook} alt="facebook" /></button>
                            <button className='social'><img src={github} alt="github" /></button>
                            <button className='social'><img src={instagram} alt="instagram" /></button>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
