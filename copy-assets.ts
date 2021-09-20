import * as shell from "shelljs"

shell.rm('-rf', 'dist/resources');
shell.cp('-R', 'resources/', 'dist/resources');