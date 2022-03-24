import Chart from "../Chart";
import FeaturedInfo from "../FeaturedInfo";
import WidgetLg from "../WidgetLg";
import WidgetSm from "../WidgetSm";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import '../../Admin.scss';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function AdminHome() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated, user } = auth;

    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("https://brand404.herokuapp.com/api/users/stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch { }
        };
        getStats();
    }, [MONTHS]);

    return (
        <>
            {isAuthenticated && user.isAdmin ?
                (
                    <>
                        <Topbar />
                        <div className="container">
                            <Sidebar />
                            <div className="home">
                                <FeaturedInfo />
                                <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
                                <div className="homeWidgets">
                                    <WidgetSm />
                                    <WidgetLg />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>You are not authorized to access this route. <Link to='/'>Go back</Link></p>
                )}

        </>

    );
}