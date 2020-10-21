import React from "react";
import { ListManager } from "react-beautiful-dnd-grid";
import styled from "styled-components";

const sortList = list => {
  return list
    .slice()
    .sort((first, second) => first.order - second.order);
};

const ListElement = ({ item: { id } }) => {
  return (
    <div className="item">
      <div>{id}</div>
    </div>
  );
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedList: sortList(props.list)
    };
  }

  sortList = () => {
    this.setState({
      ...this.state,
      sortedList: sortList(this.state.sortedList)
    });
  };

  reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = this.state.sortedList;
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      this.sortList();
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order =
        list[list.length - 1].order + 1;
      this.sortList();
      return;
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list[destinationIndex].order +
          list[destinationIndex - 1].order) /
        2;
      this.sortList();
      return;
    }
    list[sourceIndex].order =
      (list[destinationIndex].order +
        list[destinationIndex + 1].order) /
      2;
    this.sortList();
  };

  render() {
    return (
      <Style>
        <div className="App">
          <ListManager
            items={this.state.sortedList}
            direction="horizontal"
            maxItems={3}
            render={item => <ListElement item={item} />}
            onDragEnd={this.reorderList}
          />
        </div>
      </Style>
    );
  }
}

export default Grid;

const Style = styled.section`
  .item {
    width: 99%;
    margin: auto;
    margin-top: 0.8%;
  }
  div[tabindex="0"] {
    width: 100%;
    text-align: center;
  }
`;
