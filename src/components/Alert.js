import { useAuthContext } from '../hooks/useAuthContext'

function Alert() {
    const {user} = useAuthContext()
    return (
    <div>
        {
            (user) ? 
                <></>:
                (<div className="alert alert-warning shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span><strong>Login to save your progress!</strong></span>
                    </div>
                </div>)
        }

    </div>
  )
}

export default Alert