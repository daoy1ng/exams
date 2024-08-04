from flask import Blueprint, request
from models.user import UserModel
from utils import restful

bp = Blueprint('api', __name__, url_prefix="/api")

@bp.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@bp.route('/getlist',methods = ['GET','POST'])
def test():  # put application's code here
    if request.method == 'GET':
        return 'resful apis!'

@bp.post('/add_user')
def add_user():
    return 'succese'


@bp.get('/get_user_list')
def user_list():
    list = UserModel.query.all()
    # user_dicts = [item.to_dict() for item in list]
    print('---------',list)
    user_dicts = []
    for user in list:
        print('-----2222----', user)
        user_dicts.append(user.to_dict())
    return restful.ok(data = user_dicts)