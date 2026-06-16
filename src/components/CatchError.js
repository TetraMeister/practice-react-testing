import React from "react";

export default class CatchError extends React.Component {
  state = {hasError: false}
  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    console.error("CatchError:", error, info.componentStack);
  }

  render() {
    if(this.state.hasError) {
      return <h1>Something went wrong</h1>  
    }
    return this.props.children;
  }
}