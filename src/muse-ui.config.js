import "muse-ui/lib/styles/base.less"
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  BottomNav,
  BottomSheet,
  Divider,
  Form,
  Icon,
  List,
  Menu,
  TextField
} from "muse-ui"

const components = [AppBar, Avatar, Badge, Button, BottomNav, BottomSheet, Divider, Form, Icon, List, Menu, TextField]

export default {
  install(Vue) {
    components.forEach(c => Vue.use(c))
  }
}