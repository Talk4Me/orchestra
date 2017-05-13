import React from 'react';
import Title from './Title';

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    const request = new Request('/api/hello', {
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    const text = fetch(request).then((res) => {
      return res.text();
    });

    text.then((res) => console.log(res));
  }
  render () {
    return (
      <div className="container">
        <div className="card">
          <Title title="Hello Title" />
        </div>
      </div>
    );
  }
}
