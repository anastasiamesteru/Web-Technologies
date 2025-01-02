import bug from '../models/bug.js';
import project from '../models/project.js';
import teammember from '../models/teammember.js';
import tester from '../models/tester.js';
import team from '../models/team.js';

async function initializeDB() {

    //Project to Bug - many-to-one relationship - one project can have many bugs
	project.hasMany(bug, {foreignKey:'projectId'});
	bug.belongsTo(project, {foreignKey:'projectId'});

	//added team table to get rid of the many to many rel between project and tm/tester
	//Project to Team - one-to-one relationship - one project can be made by only one team
	project.hasOne(team, {foreignKey:'projectId'});
	team.belongsTo(project, {foreignKey:'projectId'});

	//Team Member to Team - many-to-one relationship
	team.hasMany(teammember, {foreignKey:'tmId'});
	teammember.belongsTo(team, {foreignKey:'tmId'});

	//Tester to Team - many-to-one relationship
	team.hasMany(tester, {foreignKey:'tstId'});
	tester.belongsTo(team, {foreignKey:'tstId'});

	//Bug to Tester - one-to-one relationship
	bug.hasOne(tester, {foreignKey:'tstId'});
	tester.belongsTo(bug, {foreignKey:'tstId'});

	//Bug to Team Member - one-to-one relationship
	bug.hasOne(teammember, {foreignKey:'tmId'});
	teammember.belongsTo(bug, {foreignKey:'tmId'});

}

export default initializeDB;
