import React, {Component} from 'react';
import Task1 from "../task1/task1";
import Task2 from "../task2/task2";
import Task3 from "../task3/task3";
import Home from "../home/Home";
import {BrowserRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import './nav-bar.css'

class NavBar extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav className={'navbar'}>
                        <div className={'nav-link'}>
                            <Link className={'link'}
                                  to={"home"}
                            >
                                Home
                            </Link>
                        </div>
                        <div className={'nav-link'}>
                            <Link className={'link'}
                                  to={"task1"}
                            >
                                Task 1
                            </Link>
                        </div>
                        <div className={'nav-link'}>
                            <Link className={'link'}
                                  to={"task2"}
                            >
                                Task 2
                            </Link>
                        </div>
                        <div className={'nav-link'}>
                            <Link className={'link'}
                                  to={"task3"}
                            >
                                Task 3
                            </Link>
                        </div>
                    </nav>
                    <Switch>
                        <Route path={'/home'}>
                            <Home/>
                        </Route>
                        <Route path={'/task1'}>
                            <Task1/>
                        </Route>
                        <Route path={'/task2'}>
                            <Task2/>
                        </Route>
                        <Route path={'/task3'}>
                            <Task3/>
                        </Route>
                        <Route path={'/'}>
                            <Redirect to={'home'}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default NavBar;