import "../../../assets/css/global.css";

export default function UserProfile({ params }: any) {
    return (
        <>
            <div className="container">

                <div>
                    <h1>Profile</h1>
                    <br />
                    <p>User ID : <span className="badge">{params.userid}</span></p>
                </div >
            </div >
        </>
    );
}