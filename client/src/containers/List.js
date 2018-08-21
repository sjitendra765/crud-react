import React, {Component } from 'react'
import { connect } from 'react-redux';
import {getusers,usersearch, deleteById} from '../actions';
import Users from './Users'

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: null,
      pageCount: null
    }
  }
  
  componentWillMount() {
    const startingPage = this.props.startingPage
      ? this.props.startingPage
      : 1;
    const data = this.props.data;
    const pageSize = this.props.pageSize;
    let pageCount = parseInt(data.length / pageSize);
    if (data.length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });
  }
  
  setCurrentPage(num) {
    this.setState({currentPage: num});
  }

  createControls() {
    let controls = [];
    const pageCount = this.state.pageCount;
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button';
      const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
      controls.push(
        <span
          className={`${baseClassName} ${activeClassName}`}
          onClick={() => this.setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return controls;
  }

  createPaginatedData() {
    const data = this.props.data;
    const pageSize = this.props.pageSize;
    const currentPage = this.state.currentPage;
    const upperLimit = currentPage * pageSize;
    const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
    return dataSlice;
  }

  render() {
    return (
      <span className='pagination'>
        <span className='pagination-controls'>
          {this.createControls()}
        </span>
        <span className='pagination-results'>
          {React.cloneElement(this.props.children, {data: this.createPaginatedData()})}
        </span>
      </span>
    );
  }
}

Pagination.propTypes = {
  data: React.PropTypes.array.isRequired,
  pageSize: React.PropTypes.number.isRequired,
  startingPage: React.PropTypes.number.isRequired
};

Pagination.defaultProps = {
  pageSize: 2,
  startingPage: 1
};



class List extends Component{

    constructor(props){
        super(props);
        this.state={
            searchByuser:''
        }
    }    
    componentDidMount(){
        this.props.getusers();
        console.log(this.props.users)
    }
    componentWillReceiveProps (nextProps,nextState){
      console.log(nextProps.user)
      if(nextProps.user !== this.props.user){
        return true;
      }
     
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.props.usersearch(event.target.value)
    }
    
    render(){
        console.log("inside",this.props.users)
        return(<div>
            <input placeholder="Search By Username" className="form-control" name ="searchByuser" value={this.state.searchByuser} onChange={this.handleChange.bind(this)}/>
        {this.props.users.length == 0 ?'':
            <Pagination data = {this.props.users}>
                <Users />
            </Pagination>
        }
        </div>
        )
    }
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function mapStateToProps(state){
    return {
        users: state.user.user
    }
}

export default connect(mapStateToProps, {getusers,usersearch, deleteById})(List);