using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadGoAPI.Migrations
{
    public partial class final_updates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_VehiclesColors_VehicleColorId",
                table: "Drivers");

            migrationBuilder.DropTable(
                name: "VehiclesColors");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_VehicleColorId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "VehiclesModels");

            migrationBuilder.DropColumn(
                name: "VehicleColorId",
                table: "Drivers");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "VehiclesModels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsTrusted",
                table: "Drivers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "VehicleColor",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "VehiclesModels");

            migrationBuilder.DropColumn(
                name: "IsTrusted",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "VehicleColor",
                table: "Drivers");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "VehiclesModels",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "VehicleColorId",
                table: "Drivers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "VehiclesColors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehiclesColors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_VehicleColorId",
                table: "Drivers",
                column: "VehicleColorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_VehiclesColors_VehicleColorId",
                table: "Drivers",
                column: "VehicleColorId",
                principalTable: "VehiclesColors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
