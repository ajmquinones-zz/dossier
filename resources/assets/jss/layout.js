import { boxShadow } from './index'

const styles = theme => ({
  card: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '25px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '3px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    overflow: 'visible',
  },
  cardHeader: {
    ...boxShadow,
    margin: "-20px 15px 0",
    borderRadius: "3px",
    padding: "15px",
    backgroundColor: theme.palette.primary.main
  },
  cardTitle: {
    float: "left",
    fontWeight: "700",
    padding: "10px 20px 10px 10px",
    lineHeight: "24px",
    fontSize: "18px",
    color: "#FFFFFF"
  },
  cardHeaderContent: {
    flex: "none"
  },
  tabsContainer: {
    marginTop: "4px",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      display: "grid"
    }
  },
  tabsIndicator: {
    display: 'none'
  },
  tab: {
    marginLeft: 15,
    '&:first-of-type': {
      margin: 0
    }
  },
  tabWrapper: {
    width: "auto",
    display: "inline-flex",
    alignItems: "inherit",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex"
    },
  },
  tabIcon: {
    float: "left",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-2px"
    }
  },
  tabLabelIcon: {
    height: "44px",
    minWidth: "72px",
    paddingLeft: "14px",
    borderRadius: "3px"
  },
  tabLabel: {
    lineHeight: "19px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "700",
    marginLeft: "-10px"
  },
  tabSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background-color .4s"
  }
}) 

export default styles
