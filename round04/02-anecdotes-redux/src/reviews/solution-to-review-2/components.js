
import React from 'react'
import {createAnecdote, votedAnecdote} from './anecdoteReducer'
import createNotification, { hideNotification } from "./notificationReducer"
import { useSelector, useDispatch } from 'react-redux'
import store from "./store"

export const Notification = () => {
    const visible = store.getState().notification.visible;
    console.log(visible);
    console.log(store.getState().notification);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if (visible) {
        return (
            <div style={style}>
                note
            </div>
        )
    }
    return (
        <div style={style}>
        </div>
    )
}

export const AnecdoteForm = () => {

    const create = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        store.dispatch(createAnecdote(content));
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export const AnecdoteList = (props) => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state);
    console.log(anecdotes.anecdoteReducer);

    const vote = (id) => {
        const filter = anecdotes.anecdoteReducer.filter(anecdote => {
            return anecdote.id === id;
        })
    
        console.log('vote', id)
        console.log(filter[0]);
    
        store.dispatch(votedAnecdote(filter[0]));
        createNotification(`You voted "${filter[0].content}"`)
        setTimeout(() => {
            hideNotification()
        }, 5000)
    }

    anecdotes.anecdoteReducer.sort(function(a,b){
        return parseFloat(b.votes) - parseFloat(a.votes);
    });

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.anecdoteReducer.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}
